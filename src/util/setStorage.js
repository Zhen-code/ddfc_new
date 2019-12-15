const storage={
    setItem:function(key,value){
        sessionStorage.setItem(key,JSON.stringify(value))
    },
    getItem:function(key){
        const value=sessionStorage.getItem(key)
        return JSON.parse(value)
    },
    removeItem:function(key){
        sessionStorage.removeItem(key)
    }
}
export default storage