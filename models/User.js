const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,        
    },
    online:{
        type: Boolean,
        default:false
    }
});

/* Extract sensitive data when user be formated like json */
UserSchema.method('toJSON', function () {
    /* 
        __v : version
        _id : id
        password: userPassword
    */
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('User', UserSchema);