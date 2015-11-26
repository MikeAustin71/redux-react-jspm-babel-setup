"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require("redux");

var Redux = _interopRequireWildcard(_redux);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Taken from The source code for this demo was taken from the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               free EggheadIO tutorial Redux: The Single Immutable Tree by
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Dan Abramov.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://egghead.io/lessons/javascript-redux-the-single-immutable-state-tree?series=getting-started-with-redux
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               This project setup has been modified to incorporate jspm and babel-6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

/*
 * We (EggheadIO) will be explaining the code below
 * in the following lessons. For now,
 * feel free to click around and notice
 * how the current state tree is logged
 * to the console on every change.
 */

var ADD_TODO = 'ADD_TODO';
var TOGGLE_TODO = 'TOGGLE_TODO';
var SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

var Filters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * Components
 */

var AddTodo = (function (_React$Component) {
    _inherits(AddTodo, _React$Component);

    function AddTodo() {
        _classCallCheck(this, AddTodo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AddTodo).apply(this, arguments));
    }

    _createClass(AddTodo, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement("input", { type: "text", ref: "input" }),
                _react2.default.createElement(
                    "button",
                    { onClick: function onClick(e) {
                            return _this2.handleClick(e);
                        } },
                    "Add"
                )
            );
        }
    }, {
        key: "handleClick",
        value: function handleClick(e) {
            var node = this.refs.input;
            var text = node.value.trim();
            this.props.onAddClick(text);
            node.value = '';
        }
    }]);

    return AddTodo;
})(_react2.default.Component);

var FilterLink = function FilterLink(_ref) {
    var isActive = _ref.isActive;
    var name = _ref.name;
    var _onClick = _ref.onClick;

    if (isActive) {
        return _react2.default.createElement(
            "span",
            null,
            name
        );
    }

    return _react2.default.createElement(
        "a",
        { href: "#", onClick: function onClick(e) {
                e.preventDefault();_onClick();
            } },
        name
    );
};

var Footer = function Footer(_ref2) {
    var filter = _ref2.filter;
    var onFilterChange = _ref2.onFilterChange;
    return _react2.default.createElement(
        "p",
        null,
        "Show:",
        ' ',
        _react2.default.createElement(FilterLink, {
            name: "All",
            isActive: filter === Filters.SHOW_ALL,
            onClick: function onClick() {
                return onFilterChange(Filters.SHOW_ALL);
            } }),
        ', ',
        _react2.default.createElement(FilterLink, {
            name: "Completed",
            isActive: filter === Filters.SHOW_COMPLETED,
            onClick: function onClick() {
                return onFilterChange(Filters.SHOW_COMPLETED);
            } }),
        ', ',
        _react2.default.createElement(FilterLink, {
            name: "Active",
            isActive: filter === Filters.SHOW_ACTIVE,
            onClick: function onClick() {
                return onFilterChange(Filters.SHOW_ACTIVE);
            } })
    );
};

var Todo = function Todo(_ref3) {
    var onClick = _ref3.onClick;
    var completed = _ref3.completed;
    var text = _ref3.text;
    return _react2.default.createElement(
        "li",
        {
            onClick: onClick,
            style: {
                textDecoration: completed ? 'line-through' : 'none',
                cursor: 'pointer'
            } },
        text
    );
};

var TodoList = function TodoList(_ref4) {
    var todos = _ref4.todos;
    var onTodoClick = _ref4.onTodoClick;
    return _react2.default.createElement(
        "ul",
        null,
        todos.map(function (todo) {
            return _react2.default.createElement(Todo, _extends({}, todo, {
                key: todo.id,
                onClick: function onClick() {
                    return onTodoClick(todo.id);
                } }));
        })
    );
};

var nextTodoId = 0;
var TodoApp = function TodoApp(_ref5) {
    var dispatch = _ref5.dispatch;
    var todos = _ref5.todos;
    var visibilityFilter = _ref5.visibilityFilter;

    var visibleTodos = todos;

    switch (visibilityFilter) {
        case Filters.SHOW_COMPLETED:
            visibleTodos = todos.filter(function (todo) {
                return todo.completed;
            });
            break;
        case Filters.SHOW_ACTIVE:
            visibleTodos = todos.filter(function (todo) {
                return !todo.completed;
            });
            break;
    }

    return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(AddTodo, {
            onAddClick: function onAddClick(text) {
                return dispatch({ type: ADD_TODO, text: text, id: nextTodoId++ });
            } }),
        _react2.default.createElement(TodoList, {
            todos: visibleTodos,
            onTodoClick: function onTodoClick(id) {
                return dispatch({ type: TOGGLE_TODO, id: id });
            } }),
        _react2.default.createElement(Footer, {
            filter: visibilityFilter,
            onFilterChange: function onFilterChange(filter) {
                return dispatch({ type: SET_VISIBILITY_FILTER, filter: filter });
            } })
    );
};

/*
 * Reducers
 */

var visibilityFilter = function visibilityFilter() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? Filters.SHOW_ALL : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

var todos = function todos() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case ADD_TODO:
            return [].concat(_toConsumableArray(state), [{
                text: action.text,
                id: action.id,
                completed: false
            }]);
        case TOGGLE_TODO:
            return state.map(function (todo) {
                return todo.id === action.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
            });
        default:
            return state;
    }
};

// const todoApp = combineReducers
var todoApp = Redux.combineReducers({
    visibilityFilter: visibilityFilter,
    todos: todos
});

/*
 * Go!
 */

// const store = createStore(todoApp);
var store = Redux.createStore(todoApp);

var dispatch = function dispatch(action) {
    store.dispatch(action);
    console.log('----------------');
    console.log('current state:');
    console.log(store.getState());
};
var render = function render() {
    _reactDom2.default.render(_react2.default.createElement(TodoApp, _extends({}, store.getState(), {
        dispatch: dispatch
    })), document.getElementById('root'));
};

render();
store.subscribe(render);
console.log('current state:');
console.log(store.getState());

// noprotect
//# sourceMappingURL=main.js.map