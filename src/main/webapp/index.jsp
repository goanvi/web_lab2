<%@ page import="model.MarkStorage" %>
<%@ page import="model.Mark" %>
<%@ page import="java.util.List" %>
<%@ page import="static java.lang.Math.abs"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./css/style.css">
    <title>Lab 1</title>
  </head>
  <body>
    <header class="header">
      <div class="header__container">
        <span>Name: Goncharov Andrey Viktorovich </span>
        <span>Group: P32312</span>
        <span>Var: 3231203</span>
      </div>
    </header>
    <main class="main">
      <div class="col-5">
        <div class="main__graph">
          <svg
            style="border: 1px solid #000; box-sizing: border-box"
            id="graph-svg"
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- circle -->
            <path
              class="graph-shape"
              d="M 250 150 A 100 100, 0, 0, 1, 150 250 L 150 150 Z"
            />

            <!-- triangle -->
            <polygon class="graph-shape" points="150,200 150,150 50,150" />

            <!-- rectangle -->
            <polygon
              class="graph-shape"
              points="50,50  50,150 150,150 150,50"
            />

            <!-- axles -->
            <text class="graph-axle-text" x="290" y="140">x</text>
            <line class="graph-axle-line" x1="0" x2="295" y1="150" y2="150" />
            <polygon
              class="graph-axle-arrow"
              points="299,150 290,155 290,145"
            />

            <text class="graph-axle-text" x="160" y="10">y</text>
            <line class="graph-axle-line" x1="150" x2="150" y1="5" y2="300" />
            <polygon class="graph-axle-arrow" points="150,1 145,10 155,10" />

            <!-- points -->
            <line class="graph-point" x1="50" x2="50" y1="145" y2="155" />
            <line class="graph-point" x1="100" x2="100" y1="145" y2="155" />
            <line class="graph-point" x1="200" x2="200" y1="145" y2="155" />
            <line class="graph-point" x1="250" x2="250" y1="145" y2="155" />

            <line class="graph-point" x1="145" x2="155" y1="250" y2="250" />
            <line class="graph-point" x1="145" x2="155" y1="200" y2="200" />
            <line class="graph-point" x1="145" x2="155" y1="100" y2="100" />
            <line class="graph-point" x1="145" x2="155" y1="50" y2="50" />

            <!-- labels -->
            <text
              class="graph-label r-whole-neg"
              text-anchor="middle"
              x="50"
              y="140"
            >
              -R
            </text>
            <text
              class="graph-label r-half-neg"
              text-anchor="middle"
              x="100"
              y="140"
            >
              -R/2
            </text>
            <text
              class="graph-label r-half-pos"
              text-anchor="middle"
              x="200"
              y="140"
            >
              R/2
            </text>
            <text
              class="graph-label r-whole-pos"
              text-anchor="middle"
              x="250"
              y="140"
            >
              R
            </text>

            <text
              class="graph-label r-whole-neg"
              text-anchor="start"
              x="160"
              y="255"
            >
              -R
            </text>
            <text
              class="graph-label r-half-neg"
              text-anchor="start"
              x="160"
              y="205"
            >
              -R/2
            </text>
            <text
              class="graph-label r-half-pos"
              text-anchor="start"
              x="160"
              y="105"
            >
              R/2
            </text>
            <text
              class="graph-label r-whole-pos"
              text-anchor="start"
              x="160"
              y="55"
            >
              R
            </text>
            <!-- ----------------------------- dotted lines----------------------------------- -->

            <!-- y-line -->
            <line
              x1="0"
              y1="150"
              x2="300"
              y2="150"
              stroke="transparent"
              stroke-dasharray="3,3"
              id="y-line"
            />

            <!-- x-lines -->
            <line
              x1="16.7"
              y1="300"
              x2="16.7"
              y2="0"
              stroke-dasharray="3,3"
              class="line dotted-line"
              data-number="1"
            />
            <line
              x1="50"
              y1="300"
              x2="50"
              y2="0"
              stroke-dasharray="3,3"
              class="line dotted-line"
              data-number="2"
            />
            <line
              x1="83.3"
              y1="300"
              x2="83.3"
              y2="0"
              stroke-dasharray="3,3"
              class="line dotted-line"
              data-number="3"
            />
            <line
              x1="116.7"
              y1="300"
              x2="116.7"
              y2="0"
              stroke-dasharray="3,3"
              class="line dotted-line"
              data-number="4"
            />
            <line
              x1="183.3"
              y1="300"
              x2="183.3"
              y2="0"
              stroke-dasharray="3,3"
              class="line dotted-line"
              data-number="5"
            />
            <line
              x1="216.7"
              y1="300"
              x2="216.7"
              y2="0"
              stroke-dasharray="3,3"
              class="line dotted-line"
              data-number="6"
            />
            <line
              x1="250"
              y1="300"
              x2="250"
              y2="0"
              stroke-dasharray="3,3"
              class="line dotted-line"
              data-number="7"
            />
            <line
              x1="283.3"
              y1="300"
              x2="283.3"
              y2="0"
              stroke-dasharray="3,3"
              class="line dotted-line"
              data-number="8"
            />

            <!-- pointer to dot -->
            <line
              x1="250"
              y1="300"
              x2="150"
              y2="300"
              stroke-dasharray="3,3"
              class="line"
              id="x-pointer"
            />
            <line
              x1="283.3"
              y1="300"
              x2="283.3"
              y2="150"
              stroke-dasharray="3,3"
              class="line"
              id="y-pointer"
            />

            <!-- ------------------------------- checked lines --------------------------------- -->

            <line
              x1="16.7"
              y1="300"
              x2="16.7"
              y2="0"
              stroke-width="20"
              stroke="transparent"
              class="hidden-line inactive"
              data-number="1"
            />
            <line
              x1="50"
              y1="300"
              x2="50"
              y2="0"
              stroke-width="20"
              stroke="transparent"
              class="hidden-line inactive"
              data-number="2"
            />
            <line
              x1="83.3"
              y1="300"
              x2="83.3"
              y2="0"
              stroke-width="20"
              stroke="transparent"
              class="hidden-line inactive"
              data-number="3"
            />
            <line
              x1="116.7"
              y1="300"
              x2="116.7"
              y2="0"
              stroke-width="20"
              stroke="transparent"
              class="hidden-line inactive"
              data-number="4"
            />
            <line
              x1="183.3"
              y1="300"
              x2="183.3"
              y2="0"
              stroke-width="20"
              stroke="transparent"
              class="hidden-line inactive"
              data-number="5"
            />
            <line
              x1="216.7"
              y1="300"
              x2="216.7"
              y2="0"
              stroke-width="20"
              stroke="transparent"
              class="hidden-line inactive"
              data-number="6"
            />
            <line
              x1="250"
              y1="300"
              x2="250"
              y2="0"
              stroke-width="20"
              stroke="transparent"
              class="hidden-line inactive"
              data-number="7"
            />
            <line
              x1="283.3"
              y1="300"
              x2="283.3"
              y2="0"
              stroke-width="20"
              stroke="transparent"
              class="hidden-line inactive"
              data-number="8"
            />
            <% MarkStorage storage = (MarkStorage) application.getAttribute("storage");
              if (storage != null){
                List<Mark> marks = storage.getListById(session.getId());
                if (marks != null){
                  for (Mark mark: marks){
                    double convX = (mark.getX() / mark.getR()) * 100 + 150;
                    double convY = -((mark.getY() / mark.getR()) * 100) + 150;%>
                    <circle cx="<%=convX%>" cy="<%=convY%>" r="2" class="dot-state"/>
                  <%}}}%>
            <!-- dot -->
            <circle cx="-30" cy="-30" r="2" class="dot dot-active" />
          </svg>
        </div>
        <div class="main__panel">
          <form class="form" id="form" method="GET">
            <div class="main__panel X panel">
              <h4>X</h4>
              <div class="main__panel x-buttons">
                <label
                  ><input type="radio" class="x-btn" value="-5" name="x-btn" /><span
                    >-5</span
                  ></label
                >
                <label
                  ><input type="radio" class="x-btn" value="-4" name="x-btn" /><span
                    >-4</span
                  ></label
                >
                <label
                  ><input type="radio" class="x-btn" value="-3" name="x-btn" /><span
                    >-3</span
                  ></label
                >
                <label
                  ><input type="radio" class="x-btn" value="-2" name="x-btn" /><span
                    >-2</span
                  ></label
                >
                <label
                  ><input type="radio" class="x-btn" value="-1" name="x-btn"/><span
                    >-1</span
                  ></label
                >
                <label
                  ><input type="radio" class="x-btn" value="0" name="x-btn" /><span
                    >0</span
                  ></label
                >
                <label
                  ><input type="radio" class="x-btn" value="1" name="x-btn" /><span
                    >1</span
                  ></label
                >
                <label
                  ><input type="radio" class="x-btn" value="2" name="x-btn" /><span
                    >2</span
                  ></label
                >
                <label
                  ><input type="radio" class="x-btn" value="3" name="x-btn" /><span
                    >3</span
                  ></label
                >
              </div>
            </div>
            <div class="main__panel Y panel">
              <h4>Y</h4>
              <input type="text" id="y-input" placeholder="In range [-3;5]" maxlength="10" />
            </div>
            <div class="main__panel R panel">
              <h4>R</h4>
              <div class="main__panel r-buttons">
                <label
                ><input type="radio" class="r-btn" value="1" name="r-btn" /><span
                >1</span
                ></label
                >
                <label
                ><input type="radio" class="r-btn" value="1.5" name="r-btn" /><span
                >1.5</span
                ></label
                >
                <label
                ><input type="radio" class="r-btn" value="2" name="r-btn" /><span
                >2</span
                ></label
                >
                <label
                ><input type="radio" class="r-btn" value="2.5" name="r-btn" /><span
                >2.5</span
                ></label
                >
                <label
                ><input type="radio" class="r-btn" value="3" name="r-btn"/><span
                >3</span
                ></label>
              </div>
            </div>
            <div style="display: flex;">
            <button class="btn" type="submit" id="submit-btn">Submit</button>
            <button class="btn" id="clear-btn">Clear</button>
            </div>
          </form>
        </div>
        <div class="notify disabled">
          <h3 class="notify__message"></h3>
        </div>
        <form method="get" action="erro.jsp">
          <button type="submit" >Error</button>
        </form>
      </div>
      <div class="col-7">
        <div class="main__table">
          <table>
            <thead>
              <tr>
                <th>X value</th>
                <th>Y value</th>
                <th>R value</th>
                <th>Area hit</th>
                <th>Current time</th>
                <th>Execution time</th>
              </tr>
            </thead>
            <tbody id="result-table-body">
            <%if (storage != null){
              List<Mark> marks = storage.getListById(session.getId());
              if (marks != null){
                for (int i = marks.size()-1; i >=0; i--){%>
                  <tr style='text-align: center;'>
                    <td><%=abs(marks.get(i).getX())%></td>
                    <td><%=marks.get(i).getY()%></td>
                    <td><%=marks.get(i).getR()%></td>
                    <td><%=marks.get(i).getHit()%></td>
                    <td><%=marks.get(i).getTime()%></td>
                    <td><%=marks.get(i).getLeadTime()%> ms</td>
                  </tr>
                <%}}}%>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <script src="index.js"></script>
  </body>
</html>
