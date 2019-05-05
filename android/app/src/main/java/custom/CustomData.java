package custom;

public class CustomData {
    private static final CustomData INSTANCE = new CustomData();
    public String SHARED_LINK = "";

    public void setSharedLink(String link){
        this.SHARED_LINK = link;
    }

    public String getSharedLink(){
        String link = this.SHARED_LINK;
        this.SHARED_LINK = "";
        return link;
    }

    public static CustomData getInstace(){
        return INSTANCE;
    }
}
