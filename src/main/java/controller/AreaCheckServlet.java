package controller;

import com.google.gson.Gson;
import model.Mark;
import model.MarkMaker;
import model.MarkStorage;
import model.WrongDataException;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@WebServlet(name = "AreaCheckServlet", value = "/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    private MarkMaker markMaker;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        markMaker = new MarkMaker();
        getServletContext().setAttribute("storage", new MarkStorage());
        gson = new Gson();
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        MarkStorage storage = (MarkStorage) getServletContext().getAttribute("storage");
        Date date = new Date();
        double xValue = Double.parseDouble(request.getParameter("x"));
        double yValue = Double.parseDouble(request.getParameter("y"));
        double rValue = Double.parseDouble(request.getParameter("r"));
        PrintWriter writer = response.getWriter();
        try {
            Mark mark = markMaker.makeMark(xValue, yValue, rValue);
            String id = request.getRequestedSessionId();
            if (!storage.containsId(id)) storage.createListById(id);
            long time = (long) getServletContext().getAttribute("leadTime");
            long executionTime =System.nanoTime() - time;
            mark.setLeadTime(executionTime);
            storage.putMarkById(id, mark);
            getServletContext().setAttribute("storage", storage);
            writer.write(gson.toJson(mark));
        }catch (WrongDataException ex){
            response.setStatus(400);
            writer.write(ex.getMessage());
        }finally {
            writer.close();
        }

    }

}
