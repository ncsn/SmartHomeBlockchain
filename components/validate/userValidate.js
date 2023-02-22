function userValidate() {
    let isAdmin=false;

    if("0x92874F71A920821006F018be4086Ab6CDdf2aF6f".toLowerCase() === sessionStorage.getItem("userAddress")) {
        isAdmin=true;
    }
  
    return isAdmin;
}

export default userValidate;