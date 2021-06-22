export const checkPassport = (req,res , next)=>{
    if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/auth')
}
export function destroy(request, response){
    req.session.destroy(function(err) {
        return response.redirect('/page')
    })
}s