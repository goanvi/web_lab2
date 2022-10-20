package model;

import java.text.SimpleDateFormat;
import java.util.Date;

public class MarkMaker {
    HitMark hitMark;
    Validator validator;
    SimpleDateFormat sdf;

    public MarkMaker() {
        sdf = new SimpleDateFormat("HH:mm:ss");
        hitMark = new HitMark();
        validator = new Validator(-5,3,-3,5,1,3);
    }

    public Mark makeMark(double x, double y, double r) throws WrongDataException{
        if (validator.isValid(x,y,r)){
            String hit = hitMark.hitMark(x, y, r)?"hit":"miss";
            String time = sdf.format(new Date());
            return new Mark(x,y,r,hit,time,0);
        }
        else throw new WrongDataException();
    }


}
