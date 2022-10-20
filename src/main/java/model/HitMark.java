package model;

public class HitMark {

    public boolean hitMark (double x, double y, double r){
        return hitInCircle(x, y, r) || hitInRectangle(x, y, r) || hitInTriangle(x, y, r);
    }

    private boolean hitInTriangle (double x, double y, double r){
        return x<=0 && y<=0 && -x/2-r/2<=y;
    }

    private boolean hitInCircle (double x, double y, double r){
        return x>=0 && y<=0 && x*x+ y*y<=r*r;
    }

    private boolean hitInRectangle (double x, double y, double r){
        return x <= 0 && x >= -r && y >= 0 && y <= r;
    }
}
