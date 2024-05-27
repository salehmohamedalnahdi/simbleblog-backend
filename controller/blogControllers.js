const service = require('../services/blogServices');
const schema=require('../validation/validationSchema')

async function showBlogs(req, res) {
  try {
    const blogs = await service.getBlogs();
    res.json(blogs);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to display blog.' });
  }
}

async function createBlog(req,res){
  const creatSchema=schema.blogSchema()
  const { error, value } =creatSchema.validate(req.body);
  if (error){
    return res.status(400).json({ error: error.details[0].message })
  }
  try {
    const newBlog=await service.addBlog(value)
    res.json(newBlog);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to create blog.' });
  }
}

async function deleteaBlog(req,res) {
 try {
  const blogId=req.params.blogId
  const checkBlog= await service.Check(blogId)
  if(!checkBlog){
    return res.json({ error: 'blog is not exsisted' });
  }
 const deleteaBlog=await service.deleteaBlog(blogId)
  res.json(deleteaBlog)
}
  catch (error) {
  console.error('Error in controller:', error);
    res.json({ error: 'Failed to delete blog.' });
 }
}

async function updateBlog(req,res) {
  //the body must be as {title:"",content:""}
  const creatSchema=schema.blogSchema()
  const { error, value } =creatSchema.validate(req.body);
  if (error){
    return res.status(400).json({ error: error.details[0].message })
  }
  try {
   const blogId=req.params.blogId
   const checkBlog= await service.Check(blogId)
   if(!checkBlog){
     return res.json({ error: 'blog is not exsisted' });
   }
   const blog= await service.updateBlog(value,blogId)
  console.log("updateed is done")
  res.json(value)
 }
   catch (error) {
   console.error('Error in controller:', error);
     res.json({ error: 'Failed to Update blog.' });
  }
 }

module.exports = {
  showBlogs,createBlog,deleteaBlog,updateBlog
};

