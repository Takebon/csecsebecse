export default {
    install: (Vue) => {
      Vue.prototype.$helpers = {
        move(e, bounds, runing) {      
          if(!runing) {return {x:0,y:0}}
            let posx = 0;
            let posy = 0;
              if (!e) e = window.event;
              if (e.pageX || e.pageY) 	{
                posx = e.pageX;
                posy = e.pageY;
              } else if (e.clientX || e.clientY) 	{
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
              }                
              const docScrolls = {
                left : document.body.scrollLeft + document.documentElement.scrollLeft, 
                top : document.body.scrollTop + document.documentElement.scrollTop
              }               
              const relmousepos = { 
                x : posx - bounds.left - docScrolls.left, 
                y : posy - bounds.top - docScrolls.top 
              }                
                return { x: relmousepos.x, y: relmousepos.y }
        },
        getAnimProps(element, relMouseX, relMouseY, bounds) {        
          let options = {
              grid_frame:  {transform: {x:[-10, 10], y:[-10, 10], z:[0, 0]},
                            rotation:  {x:[0, 0], y:[0, 0], z:[-2, 2]}},
              grid_title:  {transform: {x:[10, -10], y:[20, -20], z:[0, 0]},
                            rotation:  {x:[0, 0], y:[0, 0], z:[-2, 2]}},
              grid_author: {transform: {x:[20, -20], y:[10, -10], z:[0, 0]},
                            rotation:  {x:[0, 0], y:[0, 0], z:[-2, 2]}},
              grid_img: {transform: {x:[-20, 20], y:[-10, 10], z:[0, 0]},
                            rotation:  {x:[0, 0], y:[0, 0], z:[2, -2]}},
          }
          for (let key in options) {
            if (key === element) {            
              let pos_x = (options[key].transform.x[1]-options[key].transform.x[0])/bounds.width*relMouseX + options[key].transform.x[0]
              let pos_y = (options[key].transform.y[1]-options[key].transform.y[0])/bounds.height*relMouseY + options[key].transform.y[0]
              let pos_z = (options[key].transform.z[1]-options[key].transform.z[0])/bounds.height*relMouseY + options[key].transform.z[0]
              let rot_X = (options[key].rotation.x[1]-options[key].rotation.x[0])/bounds.height*relMouseY + options[key].rotation.x[0]
              let rot_Y = (options[key].rotation.y[1]-options[key].rotation.y[0])/bounds.height*relMouseX + options[key].rotation.y[0]
              let rot_Z = (options[key].rotation.z[1]-options[key].rotation.z[0])/bounds.height*relMouseX + options[key].rotation.z[0]
              return {x: pos_x, y: pos_y, z: pos_z, rX: rot_X, rY: rot_Y, rZ: rot_Z}
            }
          }
        },                 
      }
    }
  }