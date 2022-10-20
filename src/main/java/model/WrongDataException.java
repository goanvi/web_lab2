package model;

public class WrongDataException extends Exception{

    @Override
    public String getMessage() {
        return "Invalid data";
    }
}
