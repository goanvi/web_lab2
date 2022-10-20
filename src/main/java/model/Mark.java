package model;

public class Mark {
    private double xValue;
    private double yValue;
    private double rValue;
    private String hit;
    private String time;
    private long leadTime;

    public Mark(double xValue, double yValue, double rValue, String hit, String time, long leadTime) {
        this.xValue = xValue;
        this.yValue = yValue;
        this.rValue = rValue;
        this.hit = hit;
        this.time = time;
        this.leadTime = leadTime;
    }

    public double getX() {
        return xValue;
    }

    public double getY() {
        return yValue;
    }

    public double getR() {
        return rValue;
    }

    public String getHit() {
        return hit;
    }

    public String getTime() {
        return time;
    }

    public long getLeadTime() {
        return leadTime;
    }

    public void setLeadTime(long leadTime) {
        this.leadTime = leadTime;
    }

    @Override
    public String toString() {
        return "Mark{" +
                "xValue=" + xValue +
                ", yValue=" + yValue +
                ", rValue=" + rValue +
                ", hit='" + hit + '\'' +
                ", time='" + time + '\'' +
                ", leadTime=" + leadTime +
                '}';
    }
}
