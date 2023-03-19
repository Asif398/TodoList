const Todo = require("../models/todo");

exports.createTodo = async (req, res) => {
    try {
      const { title, description } = req.body;
      console.log(req.body,"hiii")
      if (!title || !description )
        return res
          .status(422)
          .json({ error: "Plz include all the fields", status: "failed" });
  
      req.user.password = undefined;
  
      const todo = new Todo({
        title,
        description,
        postedBy: req.user,
      });
      const result = await todo.save();
      if (!result)
        return res
          .status(400)
          .json({ error: "unable to create the todo", status: "failed" });
      return res.status(200).json({
        post: result,
        message: "successfully created the todo",
        status: "success",
      });
    } catch (err) {
      return res.status(500).json({
        err: err.message,
        error: "Somethings went wrong",
        status: "failed",
      });
    }
  };

  exports.getAllTodo = async (req, res) => {
    try {
      const todo = await Todo.find()
        .populate("postedBy", "_id name")
      
      if (!todo)
        return res
          .status(400)
          .json({ error: "unable to get the todo", status: "failed" });
      return res.status(200).json({
        todos: todo,
        message: "All the todo post is here",
        status: "success",
      });
    } catch (err) {
      return res.status(500).json({
        err: err.message,
        error: "Somethings went wrong",
        status: "failed",
      });
    }
  };

  exports.getMyTodo = async (req, res) => {
    try {
      let todo = await Todo.find({ postedBy: req.user._id }).populate(
        "postedBy",
        "_id name"
      );
      if (!todo)
        return res
          .status(400)
          .json({ error: "unable to get the todo", status: "failed" });
      return res.status(200).json({
        todos: todo,
        message: "All my  todo is here",
        status: "success",
      });
    } catch (err) {
      return res.status(500).json({
        err: err.message,
        error: "Somethings went wrong",
        status: "failed",
      });
    }
  };

  
exports.updateTodo = async(req,res)=>{
    console.log("hiiii",req.body);
   let todo = await Todo.updateOne(
     {_id:req.params.id},
     {$set:req.body}
   );
   console.log("hello result",todo);
   res.json({todo});
   
 }