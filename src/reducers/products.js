const initialState = {

  unitText: [ {id: 43, name: 'Facilities'},
              {id: 2, name:  'Finance'},
              {id: 40, name:  'Frontoffice'},
              {id: 4, name:  'Human Resources'},
              {id: 55, name:  'IT'},
              {id: 6, name:  'Managementteam'},
              {id: 10, name:  'Planning'},
              {id: 20, name:  'Sales'},

            ],
  elSelected: [],

};


export default function( state = initialState, action ) {

   let new_state;
  switch (action.type) {
    case 'SELECT' :
      let existElem = "";
      let allselel = [];
      new_state = JSON.parse(JSON.stringify(state));

      // check if the selected unit was not selected before
      if (new_state.elSelected.length !== 0) {
         new_state.elSelected.forEach((unit, index) => {
          if (unit.id === action.item.id) {
            existElem =  index;
          }
          allselel.push(unit.id);
        });

        if (existElem !== "") {
          new_state.elSelected.splice(Number(existElem), 1);
        }else {
          new_state.elSelected.push({
             id: action.item.id,
             name: action.item.name,
           });
        }
      }else {
          new_state.elSelected.push({
             id: action.item.id,
             name: action.item.name,
           });
      }

    return new_state;

    case 'DELETE' :
      new_state = JSON.parse(JSON.stringify(state));

      // delete the chosen element
      new_state.elSelected.forEach((unit, index) => {
        if (Number(unit.id) === action.elemID)
          new_state.elSelected.splice(index, 1);
      });

    return new_state;

    case 'KEY_ADD_CHECKED' :
      new_state = JSON.parse(JSON.stringify(state));

      // get the existing selected elements
      let selElem = [];
      if (new_state.elSelected.length !== 0) {
        new_state.elSelected.forEach( prod => {
          selElem.push(prod.id);
        });
      }

      // set the selected element
      if (selElem.indexOf(action.elemid) !== -1) {
        new_state.elSelected.forEach((prod, index) => {
            if (action.elemid === Number(prod.id)) {
              new_state.elSelected.splice(index, 1);
            }
          });
      }
      if (selElem.indexOf(action.elemid) === -1) {
        let selElement = new_state.unitText.filter(unit => Number(unit.id) === action.elemid);
        new_state.elSelected.push(selElement[0]);
      }

    return new_state;

    default: return state;

  }

}
