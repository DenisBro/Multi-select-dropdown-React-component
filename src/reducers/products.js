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
    return new_state;

    case 'DELETE' :
    new_state = JSON.parse(JSON.stringify(state));
    console.log(action)
    new_state.selection.forEach((unit, index) => {
      if (Number(unit.id) === action.elemID)
        new_state.selection.splice(index, 1);
    });

    return new_state;

    default: return state;

  }

}
