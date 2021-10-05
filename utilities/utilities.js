function generateNamespace(length = 6) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   console.log("generated complete =" + result);
   return result;
};

module.exports = {
   generateNamespace: generateNamespace,
}