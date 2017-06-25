const initialState = {

  unitText: [ {id: 1, name: 'Facilities'},
              {id: 2, name:  'Finance'},
              {id: 3, name:  'Frontoffice'},
              {id: 4, name:  'Human Resources'},
              {id: 5, name:  'IT'},
              {id: 6, name:  'Managementteam'},
              {id: 7, name:  'Planning'},
              {id: 8, name:  'Sales'}

            ],
};

initialState.unitText.forEach( unit => {
  unit.elemColor = '#fff';
  unit.bordColor = '#ddd';
  unit.zIndex    = 1;
})

export default function( state = initialState, action ) {

   let new_state;
  switch (action.type) {
    case 'SELECT' :
      let existElem = "";
      new_state = JSON.parse(JSON.stringify(state));
      new_state.selection = new_state.selection ? new_state.selection : [];

      // check if the selected unit was not selected before
      if (new_state.selection.length !== 0) {
         new_state.selection.forEach((unit, index) => {
          if (Number(unit.id) === action.item.id) {
            existElem =  index;
          }
        });
        if (existElem !== "") {
          new_state.selection.splice(Number(existElem), 1);
        }else {
          new_state.selection.push({
             id: action.item.id,
             text: action.item.name,
           });
        }
      }else {
          new_state.selection.push({
             id: action.item.id,
             text: action.item.name,
           });
      }

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
          else if (unit.elemColor === '#f2fafd') {
            unit.elemColor = '#fff';
            unit.bordColor = '#ddd';
            unit.zIndex    = 1;
          }
        }
      });



    return new_state;

    case 'DELETE' :
    new_state = JSON.parse(JSON.stringify(state));
    new_state.selection.forEach((unit, index) => {
      if (Number(unit.id) === action.elemID)
        new_state.selection.splice(index, 1);
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

    default: return state;

  }

}
