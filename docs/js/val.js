function getId(){

    return "1fb7d44961d0a4e9c1196cd7e9c87c7eb361a10b740a2b5e5c6dfc0b6035320c";
};

function getPass(){

    return "b955ba6289e30fc9730d7897c463a3db7032ef8220b895dc94084eb8c164db70"
};

function compare(val){

    if(val != 'data=' + getId()){
        window.open("./index.html", "_self");
    }
};