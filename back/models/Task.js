//create a class for Task

class Task{
	constructor(object){
		this.title = object.title;
		this.description = object.description;
		this.status = "not started";
		this.id = object.id;
	}
}