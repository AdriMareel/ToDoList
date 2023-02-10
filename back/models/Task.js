//create a class for Task

module.exports = class Task{
		constructor(object){
			this.title = object.task;
			this.description = object.description;
			this.status = "not started";
			this.id = object.id;
		}
	}