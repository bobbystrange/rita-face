import HomePage from '../components/HomePage';
import TagsPage from "../components/TagsPage";
import SearchPage from '../components/SearchPage';
import AboutPage from "../components/AboutPage";
import PostPage from "../components/PostPage";
import NotFoundPage from "../components/common/NotFoundPage";
import StylesPage from "../components/StylesPage";
import TagPage from "../components/TagPage";
import {ArchivesPage} from "../components/ArchivesPage";

const routes = [
    {path: '/', component: HomePage},
    {path: '/tags', component: TagsPage},
    {path: '/tags/:tag', component: TagPage},
    {path: '/archives', component: ArchivesPage},
    {path: '/styles', component: StylesPage},
    {path: '/search', component: SearchPage},
    {path: '/about', component: AboutPage},
    {path: '/:year/:month/:day/:name', component: PostPage},
    // {path: '/post/:id', component: PostPage},
    {path: '*', component: NotFoundPage},


];

export default routes;
