# -*- coding: utf-8 -*-
def index():
    #db.survey.description.readable=False
    #db.survey.choices.readable=False
    # db.survey.name.represent = lambda name,row: A(name,_href=URL('take_survey',args=row.uuid))
    #grid = SQLFORM.grid(db.survey.created_by==auth.user_id,create=False,editable=False,deletable=True,details=False,
                      #links=[#lambda row: A('take',_href=URL('take_survey',args=row.uuid),_class="btn"),
                             #lambda row: A('results',_href=URL('see_results',args=row.uuid),_class="btn")])
    return locals()

@auth.requires_login()
def create_survey():
    #def f(form):
        #form.vars.results = [0]*len(request.vars.choices)
        #form.vars.results = request.vars.choices
    from gluon.utils import web2py_uuid,time
    db.survey.uuid.default = uuid = web2py_uuid()
    #form = SQLFORM(db.survey).process(session=None, formname='test',onvalidation=f)
    form = SQLFORM(db.survey).process(session=None, formname='test')
    if form.accepted:
        time.sleep(4)
        redirect(URL('thank_you',args=uuid))
    elif form.errors:
        response.flash = 'Form errorz'
    return locals()


@auth.requires_membership('managers')
def manage():
    #See results from everyone
    grid = SQLFORM.grid(db.survey,create=False,editable=False,deletable=True,details=False,
    #See results only from logged in user, aka admin because requires membership
    #grid = SQLFORM.grid(db.survey.created_by==auth.user_id,create=False,editable=False,deletable=True,details=False,
                       links=[#lambda row: A('take',_href=URL('take_survey',args=row.uuid),_class="btn"),
                              lambda row: A('results',_href=URL('see_results',args=row.uuid),_class="btn")])
    return locals()


@auth.requires_login()
def take_survey():
    uuid = request.args(0)
    survey = db.survey(uuid=uuid)
    if survey.requires_login:
        if not auth.user:
            redirect(URL('user/login',vars=dict(_next=URL(args=request.args))))
        #vote = db.vote(survey=survey.id,created_by=auth.user.id)
        participate = db.survey(uuid=uuid,created_by=auth.user.id)
        if participate:
            session.flash = 'Du har redan deltagit, dumma fan!!'
            redirect(URL('thank_you'))
    if request.post_vars:
        #k = int(request.post_vars.choice)
        k = request.post_vars.choice
        #survey.results[k]+=0
        survey.update_record(results=survey.results)
        db.vote.insert(survey=survey.id)
        redirect(URL('thank_you'))
    return locals()

#@auth.requires_login()
@auth.requires_membership('managers')
def see_results():
    uuid = request.args(0)
    survey = db.survey(uuid=uuid)
    if survey.created_by!=auth.user.id:
        session.flash = 'User not authorized'
        redirect(URL('index'))
    return locals()

def thank_you():
    return dict()

#Phaser.js
def phaser2():
    return locals()
def phaser():
    return locals()

#Pixi.js
def pixi():
    return locals()

def user():

    if request.args(0) == 'register':
        for field in ['first_name','last_name', 'email']:
            db.auth_user[field].readable = db.auth_user[field].writable = False
    return dict(form=auth())


    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
    """
    return dict(form=auth())


@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()

