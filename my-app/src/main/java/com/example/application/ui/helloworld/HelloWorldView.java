package com.example.application.ui.helloworld;

import com.example.application.ui.MainLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

@PageTitle("Hello World")
@Route(value = "helloworld", layout = MainLayout.class)
@RouteAlias(value = "helloworld", layout = MainLayout.class)
public class HelloWorldView extends VerticalLayout {
    public HelloWorldView() {
    }
}
