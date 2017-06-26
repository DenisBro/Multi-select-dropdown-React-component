const initialState = {

  unitText: [ {id: 1, name: 'Facilities'},
              {id: 2, name:  'Finance'},
              {id: 3, name:  'Frontoffice'},
              {id: 4, name:  'Human Resources'},
              {id: 5, name:  'IT'},
              {id: 6, name:  'Managementteam'},
              {id: 7, name:  'Planning'},
              {id: 8, name:  'Sales'},

            ],
  elSelected: [],

};

initialState.unitText.forEach( unit => {
  unit.bordColor = '#ddd';
  unit.zIndex    = 1;
})

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
             text: action.item.name,
           });
        }
      }else {
          new_state.elSelected.push({
             id: action.item.id,
             text: action.item.name,
           });
      }

      let selElemnt = state.unitText.filter( unit => unit.id === action.item.id)[0];

      // set the `background-color`, `borderColor` for selected element
      new_state.unitText.forEach( unit => {
        if (unit.id === action.item.id) {

          if (!unit.elemColor) {
            unit.elemColor = '#f2fafd';
            unit.bordColor = '#c0dee9';
            unit.zIndex    = 2;
          }
          else if (unit.elemColor === '#fff') {
            unit.elemColor = '#f2fafd';
            unit.bordColor = '#c0dee9';
            unit.zIndex    = 2;
          }
          else if (unit.elemColor === '#f2fafd' && selElemnt.elemColor === "#f2fafd" && !unit.trace) {
            delete unit.elemColor;
            unit.bordColor = '#ddd';
            unit.zIndex    = 1;
          }
          else if (unit.elemColor === '#f2fafd' && !unit.trace) {
            delete unit.elemColor;
            unit.bordColor = '#ddd';
            unit.zIndex    = 1;
          }
          else if (unit.elemColor === '#f2fafd' && unit.trace && allselel.indexOf(unit.id) === -1) {
            unit.elemColor = '#f2fafd';
            unit.bordColor = '#c0dee9';
            unit.zIndex    = 2;
            unit.trace     = false;
          }
          else if (unit.elemColor === '#f2fafd' && unit.trace && allselel.indexOf(unit.id) !== -1) {
            delete unit.elemColor;
            unit.bordColor = '#ddd';
            unit.zIndex    = 1;
            unit.trace     = false;
          }
        }else if (unit.id !== action.item.id && allselel.indexOf(unit.id) === -1) {
          delete unit.elemColor;
          unit.bordColor = '#ddd';
          unit.zIndex    = 1;
        }
        else if (unit.id !== action.item.id && allselel.indexOf(unit.id) !== -1) {
          unit.elemColor = '#f2fafd';
          unit.bordColor = '#c0dee9';
          unit.zIndex    = 2;
          unit.trace     = false;
        }
      });
    return new_state;

    case 'DELETE' :
      new_state = JSON.parse(JSON.stringify(state));

      // delete the chosen element
      new_state.elSelected.forEach((unit, index) => {
        if (Number(unit.id) === action.elemID)
          new_state.elSelected.splice(index, 1);
      });

      // set the `background-color` for selected element
      new_state.unitText.forEach( unit => {
        if (unit.id === action.elemID) {
          unit.elemColor = '#fff';
          unit.bordColor = '#ddd';
          unit.zIndex    = 1;
        }
      });
    return new_state;

    case 'KEY_ADD_COLOR' :
      new_state = JSON.parse(JSON.stringify(state));

      // get the existing selected elements
      let elemSelected = [];
      if (new_state.elSelected && new_state.elSelected.length !== 0) {
        new_state.elSelected.forEach( prod => {
          elemSelected.push(prod.id);
        });
      }

      // set the `background-color` for selected element
      new_state.unitText.forEach( unit => {
        if(unit.id === action.elem) {
          unit.elemColor = '#f2fafd';
          unit.bordColor = '#00aae1';
          unit.zIndex = 3;
          unit.trace = true;
        }
        if (unit.id !== action.elem) {
          delete unit.elemColor;
          unit.bordColor = '#ddd';
          unit.trace = false;
          unit.zIndex = 1;
        }
        if (elemSelected.indexOf(unit.id) !== -1) {
          unit.elemColor = '#f2fafd';
          unit.bordColor = '#c0dee9';
          unit.zIndex = 2;
        }
        if (unit.trace) {
          unit.bordColor = '#00aae1';
          unit.zIndex = 3;
        }
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
      new_state.unitText.forEach( unit => {
        if (unit.trace && selElem.indexOf(unit.id) !== -1) {
          new_state.elSelected.forEach((prod, index) => {
            if (unit.id === prod.id) {
              new_state.elSelected.splice(index, 1);
            }
              delete unit.elemColor;
              unit.bordColor = '#00aae1';
              unit.zIndex    = 3;
              unit.elemColor = '#f2fafd';
          });
        }
        if (unit.trace && selElem.indexOf(unit.id) === -1) {
          if (!new_state.elSelected) {
            new_state.elSelected = []
          }
          unit.bordColor = '#00aae1';
          unit.zIndex    = 3;
         unit.trace = true;
          new_state.elSelected.push({
            id: unit.id,
            text: unit.name,
          });
        }
      });

    return new_state;

    default: return state;

  }

}
