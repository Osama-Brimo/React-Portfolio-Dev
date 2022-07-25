export function numberToSection(number) {

    const _numberToSection = {
        '0': 'Welcome',
        '1': 'Work',
        '2': 'Projects',
        '3': 'Contact'
    };

    return _numberToSection[number];
}

export function sectionToNumber(section) {
    const _sectionToNumberUpCase = {
        'Welcome': '0',
        'Work': '1',
        'Projects': '2',
        'Contact': '3',
    };
    const _sectionToNumberDownCase = {
        'welcome': '0',
        'work': '1',
        'projects': '2',
        'contact': '3',
    };

    let result = _sectionToNumberUpCase[section] || _sectionToNumberDownCase[section];

    return result || '0';
}

export function getVacantTimeoutIDName () {
    let name;
    let i = 0;
    while (true) {
        let tryName = `timeoutID_${i}`;
        if (!window[tryName]) {
            name = tryName;
            break;
        }
        i++;
    }

    return name;
}



export function throttle(callback, limit, ...args) {
    let timeoutID = `timeoutID`;
    
    if (!window[timeoutID]) {
        window[timeoutID] = setTimeout(() => {
            callback(...args);
            clearTimeout(window[timeoutID]);
            window[timeoutID] = false;
        }, limit);
    }

    return timeoutID;
}

export function returnTransform(section, axis) {

    section = typeof section === 'string' ? parseInt(section) : section;
    axis = axis.toUpperCase();
  
    let step = 100;
    let value = section * step;
    let unit = axis === 'Y' ? 'vh' : axis === 'X' ? 'vw' : 'px';
  
    let style = `translate${axis}(-${value}${unit})`;
  
    return style;
  }

// export function throttle () {}