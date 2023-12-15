// todo.js

const todoList = () => {
  const all = [];

  const formatDate = (date) => {
    // Ensure date is in 'YYYY-MM-DD' format
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const add = (todoItem) => {
    // Enforce 'YYYY-MM-DD' format for dueDate
    if (todoItem.dueDate) {
      const dueDate = new Date(todoItem.dueDate);
      if (!isNaN(dueDate)) {
        todoItem.dueDate = formatDate(dueDate);
      }
    }
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((element) => element.dueDate < formatDate(new Date()) && !element.completed);
  };

  const dueToday = () => {
    return all.filter((element) => element.dueDate === formatDate(new Date()) && !element.completed);
  };

  const dueLater = () => {
    return all.filter((element) => element.dueDate > formatDate(new Date()) && !element.completed);
  };

  const toDisplayableList = (items) => {
    return items.map(item => {
      const status = item.completed ? '[x]' : '[ ]';
      return `${status} ${item.title} ${item.dueDate ? item.dueDate : ''}`;
    }).join('\n');
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;

const todos = todoList();

const formattedDate = d => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 1)));

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false });
todos.add({ title: 'Pay rent', dueDate: today, completed: true });
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false });
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false });
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");


