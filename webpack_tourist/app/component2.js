import style from './common2.css';

export default (text = '22222222') => {
    var element = document.createElement('div');
    element.innerHTML = text;
    element.className = style.haha;
    return element;
};