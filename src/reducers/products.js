const initialState = {

  unitText: [ {id: 1, name: 'Facilities', elemColor: '#fff'},
              {id: 2, name:  'Finance', elemColor: '#fff'},
              {id: 3, name:  'Frontoffice', elemColor: '#fff'},
              {id: 4, name:  'Human Resources', elemColor: '#fff'},
              {id: 5, name:  'IT', elemColor: '#fff'},
              {id: 6, name:  'Managementteam', elemColor: '#fff'},
              {id: 7, name:  'Planning', elemColor: '#fff'},
              {id: 8, name:  'Sales', elemColor: '#fff'}

            ],
};

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

      // set the `background-color` for selected element
      new_state.unitText.forEach( unit => {
        if (unit.id === action.item.id) {
          if (!unit.elemColor)
            unit.elemColor = '#f2fafd';
          else if (unit.elemColor === '#fff')
            unit.elemColor = '#f2fafd';
          else if (unit.elemColor === '#f2fafd')
            unit.elemColor = '#fff';
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
      }
    });

    return new_state;

    default: return state;

  }

}
