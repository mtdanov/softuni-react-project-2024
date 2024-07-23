const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt')

// const User = require('./model/User')
const Blog = require('./model/Blog');
const Product = require('./model/Product');

const userService = require("./services/userService");
const User = require('./model/User');
const Order = require('./model/Order');
const Animal = require('./model/Animal')


app.use(cors());
app.use(express.json());
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/test-upload')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({
    storage: storage
})

// BLOG

// CREAT BLOG
app.post('/blog/create', upload.single('file'), (req, res) => {
    // console.log(req.file);
    Blog.create({
        title: req.body.title, description: req.body.description,
        file: req.file.filename
    }).then(result => res.json(result)).catch(err => res.json(err))
})

// GET ALL ARTICLES
app.get('/articles', (req, res) => {
    Blog.find().then(posts => res.json(posts)).catch(err => res.json(err))
})


// GET ARTICLE
app.get('/article/:id', (req, res) => {
    const id = req.params.id
    Blog.findById({ _id: id }).then(post => res.json(post)).catch(err => console.log(err))
})

app.get('/latestArticles', (req, res) => {
    Blog.find().sort({ createdAt: -1 }).limit(3).then(result => res.json(result)).catch(err => console.log(err))
})

// EDIT ARTICLE
app.put('/editArticle/:id', upload.single('file'), (req, res) => {
    console.log(req.body);

    const id = req.params.id
    console.log(id);
    Blog.findByIdAndUpdate({ _id: id }, { title: req.body.title, file: req.file.filename, description: req.body.description }).then(result => res.json("Success")).catch(err => res.json(err))

})
// DELETE ARTICLE
app.delete('/deleteArticle/:id', (req, res) => {
    Blog.findByIdAndDelete({ _id: req.params.id }).then(result => res.json('Success')).catch(err => res.json(err))
})


//PRODUCT

// CREATE PRODUCT
app.post('/product/create', upload.single('file'), (req, res) => {
    console.log(req.body);
    Product.create({
        name: req.body.name, description: req.body.description,
        file: req.file.filename, price: req.body.price,
        category: req.body.category, type: req.body.type
    }).then(result => res.json(result)).catch(err => res.json(err))
})

// GET ALL PRODUCTS
app.get('/products/:colection', (req, res) => {
    console.log(req.params.colection);
    Product.find({ category: req.params.colection }).then(result => res.json(result)).catch(err => res.json(err))
})

// app.get('/products', (req, res) => {
//     Product.find().then(posts => res.json(posts)).catch(err => res.json(err))
// })


// GET PRODUCT
app.get('/product/:id', (req, res) => {
    const id = req.params.id
    Product.findById({ _id: id }).then(post => res.json(post)).catch(err => console.log(err))
})

// EDIT PRODUCT
app.put('/editProduct/:id', upload.single('file'), (req, res) => {
    // console.log(req.body);

    const id = req.params.id
    console.log(id);
    Product.findByIdAndUpdate({ _id: id }, { name: req.body.name, description: req.body.description, file: req.file.filename, price: req.body.price }).then(result => res.json("Success")).catch(err => res.json(err))

})
// last products
app.get('/latestProducts', (req, res) => {
    Product.find().sort({ createdAt: -1 }).limit(5).then(result => res.json(result)).catch(err => console.log(err))
})

// DELETE PRODUCT
app.delete('/deleteProduct/:id', (req, res) => {
    Product.findByIdAndDelete({ _id: req.params.id }).then(result => res.json('Success')).catch(err => res.json(err))
})



// REGISTER
app.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        const { name, lastName, email, password, rePass, country, city, street, streetNumber } = req.body;
        const result = await userService.register({ name, lastName, email, password, rePass, country, city, street, streetNumber });

        res.json(result);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
});
// LOGIN
app.post("/login", async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password } = req.body;
        const result = await userService.login({ email, password });
        res.json(result);
    } catch ({ message }) {
        res.status(400).json({ message });
    }
});
//LOGOUT
app.get("/logout", (req, res) => {
    res.end({ message: 'succes' }); // TODO: check if the token is valid
});

// PROFILE
app.get('/profile/:id', (req, res) => {
    const id = req.params.id
    User.findById({ _id: id }).then(data => res.json(data)).catch(err => console.log(err))
})

app.post('/profile/edit', async (req, res) => {
    console.log(req.body.data.password);
    const id = req.body.id
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.data.password, salt);
    req.body.data.password = hashedPassword
    const { name, lastName, country, city, street, streetNumber, email, password } = req.body.data;
    console.log(password);
    await User.findByIdAndUpdate({ _id: id }, { name, lastName, country, city, street, streetNumber, email, password })
})

// ORDER
app.post('/order', async (req, res) => {
    let user = req.body.userId
    let data = req.body.cartProducts
    const newArr = []

    data.forEach((element) => {
        const { product, quantity } = element
        const products = { ...product, quantity }
        newArr.push(products)
    })
    const order = new Order({
        user_id: user,
        order: newArr,
    })
    await order.save()
    console.log(order._id.toString());
    console.log(user);
    const u = await User.findById({ _id: user })
    u.orders.push(order._id)
    await u.save()

})

app.get('/order/:orderId', (req, res) => {

    // console.log(req.params);
    const id = req.params.orderId
    Order.findById({ _id: id }).then(post => res.json(post)).catch(err => console.log(err))

})

// ANIMAL

app.post('/animal/create', upload.single('file'), async (req, res) => {
    const _id = req.body.owner
    const createdAnimal = await Animal.create({
        name: req.body.name, breed: req.body.breed, age: req.body.age,
        description: req.body.description, owner: req.body.owner, file: req.file.filename
    })
    res.json('OK')
    await User.findByIdAndUpdate(_id, { $push: { createdAnimals: createdAnimal._id } })
})

app.get('/animals', (req, res) => {
    Animal.find().then(result => res.json(result)).catch(err => console.log(err))
})

app.get('/animal/:animalId', (req, res) => {
    const id = req.params.animalId
    Animal.findById({ _id: id }).then(result => res.json(result)).catch(err => console.log(err))
})

app.delete('/deletePost/:id', (req, res) => {
    Animal.findByIdAndDelete({ _id: req.params.id }).then(result => res.json('Success')).catch(err => res.json(err))
})

app.put('/editPost/:id', upload.single('file'), (req, res) => {
    // console.log(req.body);

    const id = req.params.id
    console.log(req.body);
    Animal.findByIdAndUpdate({ _id: id }, {
        name: req.body.name, breed: req.body.breed, age: req.body.age,
        description: req.body.description, owner: req.body.owner, file: req.file.filename
    }).then(result => res.json("Success")).catch(err => res.json(err))

})



/// coments
app.post('/article/:articleId/comment', async (req, res) => {
    const id = req.params.articleId
    const data = req.body
    // console.log(data);
    try {
        const article = await Blog.findById(id)
        article.comments.push(data)
        await article.save()
        res.json('OK')
    } catch (err) {
        console.log(err)
    }
})

app.get('/article/:articleId/comments', (req, res) => {
    const id = req.params.articleId
    Blog.findById(id).then(result => res.json(result)).catch(error => console.log(error))
})
app.listen(3010, () => { console.log('Server is running') })