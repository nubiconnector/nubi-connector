export const getObjFromKeys = (keys) =>
    keys.reduce(
        (_obj, t) => ({
            ..._obj,
            [t]: null,
        }),
        {}
    );
