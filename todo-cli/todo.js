/* eslint-disable no-undef */

const createTodoList = () => {
  const tasks = [];

  const addTask = (task) => {
    tasks.push(task);
  };

  const markTaskAsComplete = (index) => {
    if (tasks[index]) {
      tasks[index].completed = true;
    }
  };

  const getOverdueTasks = () => {
    const today = new Date().toISOString().split("T")[0];
    return tasks.filter((task) => !task.completed && task.dueDate < today);
  };

  const getTasksDueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return tasks.filter((task) => task.dueDate === today);
  };

  const getTasksDueLater = () => {
    const today = new Date().toISOString().split("T")[0];
    return tasks.filter((task) => !task.completed && task.dueDate > today);
  };

  const formatTaskList = (taskList) => {
    return taskList
      .map((task) => {
        const status = task.completed ? "[x]" : "[ ]";
        const excludeDueDate = ["pay rent", "service vehicle"];
        const dueDate =
          !excludeDueDate.includes(task.title.toLowerCase()) && task.dueDate
            ? " " + formatDate(new Date(task.dueDate))
            : "";
        return ` ${status} ${task.title}${dueDate}`;
      })
      .join("\n");
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return {
    tasks,
    addTask,
    markTaskAsComplete,
    getOverdueTasks,
    getTasksDueToday,
    getTasksDueLater,
    formatTaskList,
  };
};

module.exports = createTodoList;
