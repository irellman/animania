import Route from '@ioc:Adonis/Core/Route'

Route.post('/genres', 'GenresController.get')
Route.post('/media', 'MediaController.get')

Route.get('/*', async ({ view }) => {
  return view.render('index')
})


