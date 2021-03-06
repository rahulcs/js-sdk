describe('Navigation - On Init', function () {

  before(function(done){
    this.searchTest = fixture.load('mock/searchTestResponse.json');

    //setup document to hold search results
    document.body.innerHTML = __html__['index.html'];

    //initialize search
    var searchConfig = jQuery.extend({}, window.config);
    searchConfig.type = 'category';
    searchConfig.getCategoryId = function(){
      return '/clothing/women/jewelry-hair/cat/cat1910053';
    };
    this.searchobj = new window.Unbxd.setSearch(searchConfig);
    
    //stub search ajax call with mock response
    this.stub = sinon.stub(jQuery, 'ajax').yieldsTo('success',this.searchTest);

    //spy OnIntialResultLoad, OnFacetLoad, OnPageLoad  and OnNoResult
    this.spyOnIntialResultLoad = sinon.spy(this.searchobj.options,
     'onIntialResultLoad');
    this.spyOnFacetLoad = sinon.spy(this.searchobj.options, 'onFacetLoad');
    this.spyOnPageLoad = sinon.spy(this.searchobj.options, 'onPageLoad');
    this.spyOnNoResult = sinon.spy(this.searchobj.options, 'onNoResult');

    this.searchobj.callResults(this.searchobj.paintResultSet);
    done();
  });

  after(function(){
    this.stub.restore();
    fixture.cleanup();
  });
  
  it('should call navigation handler', function(){
    expect(this.searchobj.getHostNPath().indexOf('/category') > -1)
      .to.be.true;
  });

  it('Should call onIntialResultLoad', function(){
    expect(this.spyOnIntialResultLoad.called).to.equal(true);
  });

  it('Should call onFacetLoad', function(){
    expect(this.spyOnFacetLoad.called).to.equal(true);
  });

  it('Should not call onPageLoad', function(){
    expect(this.spyOnPageLoad.called).to.equal(false);
  });
  
  it('Should not call onNoResult', function(){
    expect(this.spyOnNoResult.called).to.equal(false);
  });
});
