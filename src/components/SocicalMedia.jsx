import {Button} from 'reactstrap';
import  { ReactComponent as FaceBook } from '../image/facebook.svg';
import { ReactComponent as Twitter } from '../image/twitter.svg';
import { ReactComponent as Mail } from '../image/mail.svg';
import  { ReactComponent as Github } from '../image/github.svg';
function SocialMedia() {
    return (
        <div className="d-flex justify-content-center gap-2">
            <Button className="p-0" color="transparent" size="sm"><FaceBook /></Button>
            <Button className="p-0" color="transparent" size="sm"><Twitter /></Button>
            <Button className="p-0" color="transparent"  size="sm"><Mail /></Button>
            <Button className="p-0" color="transparent"  size="sm"><Github /></Button>
        </div>
    )

}

export default SocialMedia;