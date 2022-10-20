package model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MarkStorage {
    Map<String, List<Mark>> markStorage;

    public MarkStorage() {
        this.markStorage = new HashMap<>();
    }

    public boolean containsId(String id){
        return markStorage.containsKey(id);
    }

    public void createListById(String id) {
        markStorage.put(id, new ArrayList<>());
    }

    public void putMarkById(String id, Mark mark) {
        markStorage.get(id).add(mark);
    }

    public List<Mark> getListById(String id){
        return markStorage.get(id);
    }

    public Map<String,List<Mark>> getStorage(){
         return markStorage;
    }

    public void clearStorageById(String id){
        markStorage.get(id).clear();
    }
}
