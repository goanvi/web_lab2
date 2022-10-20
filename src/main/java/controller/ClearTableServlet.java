package controller;

import model.MarkStorage;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "ClearTableServlet", value = "/ClearTableServlet")
public class ClearTableServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        MarkStorage storage = (MarkStorage) getServletContext().getAttribute("storage");
        String id = request.getRequestedSessionId();
        if (storage.containsId(id)){
            storage.clearStorageById(id);
        }
        getServletContext().setAttribute("storage", storage);
    }

}
