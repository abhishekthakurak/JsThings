// createStore(reducer, [preloadedState], [enhancer])


// basic implementation
function createStore (reducer) {
    let state;
    let listeners = [];
    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    dispatch({}); // we can also pass the preload state
    return { getState, dispatch, subscribe };
}