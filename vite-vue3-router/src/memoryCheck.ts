let mixin = {};

// eslint-disable-next-line no-undef
const detect = typeof window.FinalizationRegistry !== 'undefined' && typeof WeakMap !== 'undefined';

if (detect) {
  const unmountedComponentWeakMap = new WeakMap();
  const unmountedComponentSet = new Set();

  const registry = new window.FinalizationRegistry((value) => {
    console.log(`[Memory] Finalize: ${value.key}`);
    unmountedComponentSet.delete(value.weakRef);
  });

  const watch = (instance) => {
    if (!unmountedComponentWeakMap.has(instance)) {
      unmountedComponentWeakMap.set(instance, instance._$memoryDetectKey);
      const weakRef = new window.WeakRef(instance);

      unmountedComponentSet.add(weakRef);
      registry.register(instance, { weakRef, key: instance._$memoryDetectKey });
      console.log(`[Memory] watch: ${instance._$memoryDetectKey}`);
    }
  };

  const unWatch = (instance) => {
    for (const weakRef of unmountedComponentSet.keys()) {
      const ref = (weakRef as any).deref();

      if (ref === instance) {
        console.log(`[Memory] unWatch: ${instance._$memoryDetectKey}`);
        unmountedComponentWeakMap.delete(instance);
        unmountedComponentSet.delete(weakRef);
        registry.unregister(instance);
        break;
      }
    }
  };

  const memoryLeakDump = () => {
    let count = 0;

    for (const weakRef of unmountedComponentSet.keys()) {
      const ref = (weakRef as any).deref();

      if (!ref) {
        continue;
      }

      const value = unmountedComponentWeakMap.get(ref);

      count++;
      console.log(`[Memory] Unmounted but not finalized: ${value}`);
    }

    console.log(`[Memory] Total count of not finalized object: ${count}`);
  };

  window.memoryLeakDump = memoryLeakDump;

  mixin = {
    data() {
      return {
        _$memoryDetectKey: undefined,
      };
    },
    created() {
      if (!this._$memoryDetectKey) {
        this._$memoryDetectKey = this._$getMemoryLeakDetectKey();
      }

      console.log(`[Memory] Component created: ${this._$memoryDetectKey}`);
    },
    mounted() {
      console.log(`[Memory] Component mounted: ${this._$memoryDetectKey}`);
      // console.log('[Memory] mounted this.$options.__file', this.$options.__file);
      //   console.log('[Memory] mounted this.$.type?.__name', this.$.type?.__name);
      //   console.log('[Memory] mounted this.$.type?.__file', this.$.type?.__file);
      // console.log(`[Memory] Component mounted this options`, this.$options);
      // console.log(`[Memory] Component mounted this $`, this.$);
      // console.log(`[Memory] Component mounted this parent`, this.$parent);
      unWatch(this);
    },
    beforeUnmount() {
      // console.log(`[Memory] Component beforeUnmount: ${this._$memoryDetectKey}`);
      watch(this);
    },
    unmounted() {
      console.log('unmounted', this.$)
      setTimeout(() => {
        const refs = (this.$.parent && this.$.parent.refs) || {};

        if (refs) {
          Object.keys(refs).forEach((key) => {
            if (Array.isArray(refs[key])) {
              refs[key] &&
                (refs[key] = refs[key].filter((item) => {
                  return refs[key]._uid !== this._uid;
                }));
            } else if (refs[key] && refs[key]._uid === this._uid) {
              delete refs[key];
            }
          });
        }

        // 用不上了
        // if (this.$options) {
        //   this.$options.parent = null;
        //   this.$options._parentListeners = null;
        // }

        if (this.$.vnode) {
          this.$.vnode.appContext = null;
          this.$.vnode.component = null;
          // this.$.vnode.componentOptions.listeners = null;
          // this.$.vnode.data.ref = null;
          // this.$.vnode.data.directives = null;
          // this.$.vnode.elm && (this.$.vnode.elm.__vue__ = null);
          this.$.vnode.el = null;
        }

        // for (const key in this.$listeners) {
        //   this.$listeners[key] = null;
        // }

        // this.$children = null;

        // if (this._vnode) {
        //   this._vnode.context = null;
        //   this._vnode.componentInstance = null;
        //   this._vnode.children = null;
        //   this._vnode.elm && (this._vnode.elm.__vue__ = null);
        //   this._vnode.elm = null;
        // }

        // this.$parent = null;
        // this._events = {};
        // this.$el && (this.$el.__vue__ = null);
        // this.$el = null;
      }, 0);
    },
    methods: {
      _$getMemoryLeakDetectKey() {
        const name = this.$options.name || this.$options.__name || '(empty-name)';
        let location = name;
        let parent = this;

        while ((parent = parent.$parent)) {
          location = `${parent.$options.name || 'root'}-${location}`;
        }

        return JSON.stringify({
          name,
          location,
          file: this.$options.__file,
          time: new Date(),
        });
      },
    },
  };
}

export default mixin;
