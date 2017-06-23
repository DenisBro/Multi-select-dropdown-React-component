const initialState = {
  selected: [{
    id: 0,
    text: '',
  }],
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
    case 'SELECT':
      new_state = JSON.parse(JSON.stringify(state));
      const new_selected = new_state.selected;
            new_selected.push({
                id: action.item.id,
                text: action.item.name,
              });
     new_state.selected = new_selected;
    return new_state;

    default: return state;

  }
}
