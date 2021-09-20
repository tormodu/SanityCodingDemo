export default {
  widgets: [
   
    {name: 'structure-menu'},
    {name: 'project-users', layout: {height: 'auto', widht:'medium'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
