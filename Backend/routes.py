# from newsfeed.apis.Add_Post import *
# from newsfeed.apis.Get_Recent_Posts import *
# from newsfeed.apis.Add_Comment import *
# from newsfeed.apis.Upvote_downvote import *
# from newsfeed.apis.Get_comments_of_a_post import *
# from newsfeed.apis.Edit_post import *
# from newsfeed.apis.Delete_post import *
# from newsfeed.apis.Get_own_posts import *
# from newsfeed.apis.Edit_comment import *
from auth.apis.create_course import *

Backend = api.namespace('api/backend')

Backend.add_resource(Create_course,'/create_course')

# Newsfeed.add_resource(Get_all_post,'/get_posts') 
# Newsfeed.add_resource(Get_Comment_of_a_post,'/<post_id>/get_comments')
# Newsfeed.add_resource(Add_post,'/add_post')
# Newsfeed.add_resource(Add_comment,'/add_comment')
# Newsfeed.add_resource(Upvote_or_Downvote_for_post,'/post/<vote>')
# Newsfeed.add_resource(Upvote_or_Downvote_for_comment,'/comment/<vote>')
# Newsfeed.add_resource(Edit_post,'/edit_post')
# Newsfeed.add_resource(Edit_comment,'/edit_comment')
# Newsfeed.add_resource(Delete_post,'/delete_post')
# Newsfeed.add_resource(Get_own_posts,'/<user_id>/get_own_posts') #this API req will come from "user service"



