import style from './common.css';

export default (text = 'hello qweworld!!!qwe') => {
    var element = document.createElement('div');
    element.innerHTML = text;
    element.className = style.name;
    return element;
};