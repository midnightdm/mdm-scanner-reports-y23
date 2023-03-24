export const StoreModel = {
  user: null,
  isLoggedIn: false,
  a: "wonder",
  b: "ment",
  ui: null,
  uiConfig: null,
  pageId: null,
  //Methods
  mapper(a,b) {
    //map stuff template
    this.a = a;
    this.b = b;
  },
  writeFills() {
    if(this.pageId == "index") {
      document.getElementById('varA').innerText = this.a;
      document.getElementById('varB').innerText = this.b;
    } 
  }
}