package model;

public class Validator {
    private final double xMin;
    private final double xMax;
    private final double yMin;
    private final double yMax;
    private final double rMin;
    private final double rMax;

    public Validator(double xMin, double xMax, double yMin, double yMax, double rMin, double rMax) {
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;
        this.rMin = rMin;
        this.rMax = rMax;
    }

    public boolean isValid(double x, double y, double r) {
        return x<=xMax && y<= yMax && r<=rMax && r>=rMin && x>=xMin && y>=yMin;
    }
}
