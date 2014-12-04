function isJQuery(jq) {
    return typeof jq === 'object' && 'jquery' in jq;
}

function resolveElement(vm, path) {
    if (typeof path === 'function') {
        var elem = path(vm);
        return resolveElement(elem);
    }

    else if (path instanceof HTMLElement) {
        return path;
    }

    else if (typeof path === 'string') {
        return path;
    }

    else if (isJQuery(path)) {
        return path[0];
    }

    return null;
}

module.exports = {
    resolveElement: resolveElement
};