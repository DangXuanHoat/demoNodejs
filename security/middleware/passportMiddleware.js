export const checkPassport = (req,res,next)=>{
    if (!req.isAuthenticated()) {
        return next()
      }
      error(req.isAuthenticated())
    return res.redirect(`${process.env.PREFIX||''}/web/auth`)
}
export function destroy(request, response){
    req.session.destroy(function(err) {
        return response.redirect('/page')
    })
}