import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";



const app= express();
const port= 3000;
const arr=[];

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function handlerb(req,res,next){
  
    next();

}

app.use(handlerb);

app.get("/", (req, res) =>{

    res.render("home.ejs");
});


app.get("/home", (req, res) =>{

    res.render("home.ejs");
});

app.get("/edit/:id", (req, res) => {
    const { id } = req.params;
    const post = arr[id];
    res.render("edit.ejs", { id, post });
  });

  app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
  
    // Update the post in the array
    if (arr[id]) {
      arr[id].title = title;
      arr[id].content = content;
    }
  
    res.redirect("/myposts"); // Redirect to the posts list
  });

app.get("/contact", (req, res) =>{

    res.render("contact.ejs");
});

app.get("/about", (req, res) =>{

    res.render("about.ejs");
});

app.post("/sumbit", (req,res) =>{

   
    const { title, content } = req.body;
    arr.push({ title, content });

    res.render("home.ejs");

});


app.get("/myposts", (req, res) =>{

 
    res.render("myposts.ejs",{ arr })
});



app.listen(port, function(){
      console.log("Sever has satarted at port: ",port);
});