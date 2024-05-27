const Joi = require('joi');


const blogSchema=()=>{
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
      });
      return schema
}
module.exports={blogSchema}
