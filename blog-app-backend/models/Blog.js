const mongoose = require('mongoose');

const tempData = {"author":"Rizvi Hassan","date":"December 22, 2023","head":"This is the heading","title":"This is the title","mainImg":"https://img.freepik.com/free-photo/natures-beauty-captured-colorful-flower-close-up-generative-ai_188544-8593.jpg","tag":"public","elements":[["p","Enter the content of paragraph",0],["h2","Enter the subheading",1],["p","Enter the content of paragraph.\nEnter the content of paragraphEnter the content of paragraphEnter the content of paragraphEnter the content of paragraphEnter the content of paragraphEnter the content of paragraphEnter the content of paragraphEnter the content of paragraph.Enter the content of paragraph\nEnter the content of paragraphEnter the content of paragraphEnter the content of paragraphEnter the content of paragraphEnter the content of paragraph",2]]}

const BlogSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    author:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    head:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    mainImg:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        required: true
    },
    elements:{
        type: Array,
        required: true
    }

});

module.exports = mongoose.model('blog', BlogSchema);