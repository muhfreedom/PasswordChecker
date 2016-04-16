# -*- coding: utf-8 -*-


db.define_table('survey',
                #Field('name',requires=IS_NOT_EMPTY()),
                #Field('passchk_pass',requires=IS_MATCH('^[a-zA-Z]\w{8,}')),
                #Field('passchk_pass2',requires=IS_MATCH('^[a-zA-Z]\w{8,}')),
                #Field('passchk_pass3',requires=IS_MATCH('^[a-zA-Z]\w{8,}')),
                Field('passchk_pass',requires=IS_NOT_EMPTY()),
                Field('passchk_pass2',requires=IS_NOT_EMPTY()),
                Field('passchk_pass3',requires=IS_NOT_EMPTY()),

                Field('entropy',requires=IS_NOT_EMPTY()),
                Field('charset',requires=IS_NOT_EMPTY()),
                Field('lenght',requires=IS_NOT_EMPTY()),
                Field('entropy2',requires=IS_NOT_EMPTY()),
                Field('charset2',requires=IS_NOT_EMPTY()),
                Field('lenght2',requires=IS_NOT_EMPTY()),
                Field('entropy3',requires=IS_NOT_EMPTY()),
                Field('charset3',requires=IS_NOT_EMPTY()),
                Field('lenght3',requires=IS_NOT_EMPTY()),

                #Field('description','text', requires=IS_NOT_EMPTY()),
                Field('choices','list:string',default='1',writable=False,readable=False),
                #Field('requires_login','boolean',default=True),
                Field('results','list:integer',readable=False, writable=False),
                Field('uuid',readable=False, writable=False),
                auth.signature)

db.define_table('vote',
                Field('survey','reference survey'),
                auth.signature)
