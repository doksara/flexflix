export const sortConnections = (x, y) => {
    if (x.connections > y.connections){
        return -1;
    }

    if (x.connections < y.connections){
        return 1;
    }

    return 0;
};

export const filter = (registry, type, search) => {
    const temp = [...Array.from(registry)];
    return applyFilter(applySearch(temp, search), type);
};

export const isEmpty = (value) => {
    return value === 'All' || !value || 0 === value.length;
};

export const applyFilter = (array, value) => {
    if (!isEmpty(value)) return array.filter(i => i.type.includes(value));
    return array;
};

export const applySearch = (array, searchValue) => {
    if (!isEmpty(searchValue)) return array.filter(i => i.title.includes(searchValue));
    return array;
};

